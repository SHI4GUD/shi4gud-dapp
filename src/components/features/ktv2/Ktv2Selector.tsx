import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select, { type SingleValue, type FormatOptionLabelMeta } from 'react-select';
import { type Address } from 'viem';
import { ShieldCheck, Landmark } from 'lucide-react';
import { useKtv2Contracts } from '../../../hooks/useKtv2Contracts';
import { useOfficialTokenInfo } from '../../../hooks/useOfficialTokenInfo';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';
import { useResponsive } from '../../../hooks/useResponsive';
import { officialKtv2Contracts } from '../../../config/officialContracts';
import { ContractSourceMode } from './Ktv2SelectorTypes';

export interface Ktv2SelectionDetails {
  address: Address | null;
  tokenAddress?: Address | null;
  logoUrl?: string;
  name?: string;
  symbol?: string;
  details?: boolean;
}

interface Ktv2SelectorProps {
  targetChainId: number;
  onContractSelected: (details: Ktv2SelectionDetails | null) => void;
  contractSourceMode?: ContractSourceMode;
  preferredDefaultContractAddress?: string | null;
  onComingSoonChange?: (isComingSoon: boolean) => void;
}

const Ktv2Selector: React.FC<Ktv2SelectorProps> = ({
  targetChainId,
  onContractSelected,
  contractSourceMode = ContractSourceMode.HARDCODED_ONLY,
  preferredDefaultContractAddress = null,
  onComingSoonChange,
}) => {
  const [selectedKtv2Address, setSelectedKtv2Address] = useState<Address | null>(null);
  const { isSmallScreen } = useResponsive();
  
  const hardcodedContracts = useMemo(() => officialKtv2Contracts[targetChainId] || [], [targetChainId]);
  const officialTokenInfoMap = useOfficialTokenInfo(hardcodedContracts, targetChainId, contractSourceMode);
  const { finalContractList, isLoadingContracts, fetchError, isComingSoon } = useKtv2Contracts(targetChainId, contractSourceMode);
  
  // Selected token address (read from chain for the currently selected contract)
  const { childTokenAddress: selectedTokenAddress } = useKtv2TokenData({
    contractAddress: selectedKtv2Address,
    targetChainId,
    isChainSupported: true,
  });

  useEffect(() => {
    onComingSoonChange?.(isComingSoon);
  }, [isComingSoon, onComingSoonChange]);

  useEffect(() => {
    if (finalContractList.length > 0) {
      const defaultAddress = preferredDefaultContractAddress as Address | null;
      if (defaultAddress && finalContractList.includes(defaultAddress)) {
        setSelectedKtv2Address(defaultAddress);
      } else if (!selectedKtv2Address || !finalContractList.includes(selectedKtv2Address)) {
        setSelectedKtv2Address(finalContractList[0]);
      }
    } else {
      setSelectedKtv2Address(null);
    }
  }, [finalContractList, preferredDefaultContractAddress]);

  useEffect(() => {
    if (selectedKtv2Address) {
      const officialInfo = officialTokenInfoMap[selectedKtv2Address];
      onContractSelected({
        address: selectedKtv2Address,
        tokenAddress: selectedTokenAddress ?? null,
        logoUrl: officialInfo?.logoUrl,
        name: officialInfo?.tokenName, 
        symbol: officialInfo?.tokenSymbol,
        details: officialInfo?.details,
      });
    } else {
      onContractSelected(null);
    }
  }, [selectedKtv2Address, selectedTokenAddress, onContractSelected, officialTokenInfoMap]);

  const formatAddress = useCallback((address: Address | string | null) => {
    if (!address) return '';
    const addrStr = String(address);
    return `${addrStr.substring(0, 4)}...${addrStr.substring(addrStr.length - 4)}`;
  }, []);

  const selectOptions = useMemo(() => {
    return finalContractList.map((address, index) => {
      const tokenInfo = officialTokenInfoMap[address];
      let baseLabel = `${formatAddress(address)} (Contract ${index + 1})`;
      let isOfficial = hardcodedContracts.includes(address);

      if (isOfficial && tokenInfo) {
        baseLabel = `${formatAddress(address)} - ${tokenInfo.tokenName} (${tokenInfo.tokenSymbol})`;
      }

      return {
        value: address,
        label: baseLabel,
        logoUrl: isOfficial ? tokenInfo?.logoUrl : undefined,
        isOfficial: isOfficial,
        rawAddress: address,
        displayIndex: index + 1,
        tokenAddress: officialTokenInfoMap[address]?.tokenAddress
      };
    });
  }, [finalContractList, hardcodedContracts, officialTokenInfoMap, formatAddress]);

  const formatOptionLabel = (option: any, {}: FormatOptionLabelMeta<any>) => {
    const tokenInfo = officialTokenInfoMap[option.value];
    const iconSize = 35;
    const containerStyles = { display: 'flex', alignItems: 'center', gap: '12px' };
    const textContainerStyles = { display: 'flex', flexDirection: 'column' as const, gap: '2px' };
    const mainTextLineStyles = { display: 'flex', alignItems: 'center', gap: '8px' };

    const icon = option.logoUrl ? 
      <img src={option.logoUrl} alt={`${option.label} logo`} style={{ width: iconSize, height: iconSize }} /> : 
      <Landmark size={iconSize} className="text-orange-500 shrink-0" />;

    const mainText = (
      <div style={mainTextLineStyles}>
        <span className="text-base text-white">{tokenInfo?.tokenSymbol || `Burn Bank #${option.displayIndex}`}</span>
        <span className="text-xs text-white">{tokenInfo?.tokenName || ''}</span>
        {option.isOfficial && (
          <span className="text-xs text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck size={16} />
            Official
          </span>
        )}
      </div>
    );
    const tokenAddressForOption: Address | string | undefined =
      option.value === selectedKtv2Address ? (selectedTokenAddress ?? option.tokenAddress) : option.tokenAddress;
    const ktv2FullAddress = String(option.value);
    const tokenFullAddress = tokenAddressForOption ? String(tokenAddressForOption) : undefined;
    const ktv2Display = formatAddress(ktv2FullAddress);
    const tokenDisplay = tokenFullAddress ? formatAddress(tokenFullAddress) : undefined;

    const subText = (
      <div className="text-[11px] text-zinc-400 leading-tight flex items-center gap-3 flex-wrap md:flex-nowrap">
        {tokenDisplay && (
          <span className="inline-flex items-center gap-1">
            <span>{tokenDisplay}</span>
          </span>
        )}
        <span className="inline-flex items-center gap-0.5">
          <Landmark size={12} className="text-orange-500" />
          <span>{ktv2Display}</span>
        </span>
      </div>
    );

    return (
      <div style={containerStyles}>
        {icon}
        <div style={textContainerStyles}>
          {mainText}
          {subText}
        </div>
      </div>
    );
  };

  const handleSelectChange = (selected: SingleValue<typeof selectOptions[0]>) => {
    setSelectedKtv2Address(selected ? (selected.value as Address) : null);
  };
  
  const selectedValue = selectOptions.find(option => option.value === selectedKtv2Address) || null;

  if (fetchError) {
    return <div className={isComingSoon ? "text-amber-400 font-bold text-center text-xl" : "text-red-500"}>
      {isComingSoon ? fetchError : `Error: ${fetchError}`}
    </div>;
  }

  return (
    <div>
      <h3 className='text-white text-md font-semibold pb-1'>Select a Burn Bank:</h3>
      {isLoadingContracts && <p>Loading contracts...</p>}
      {!isLoadingContracts && !fetchError && finalContractList.length === 0 && (
        <p>No Burn Banks found for this network or configuration.</p>
      )}
      {!isLoadingContracts && finalContractList.length > 0 && (
        <Select
          value={selectedValue}
          options={selectOptions}
          onChange={handleSelectChange}
          formatOptionLabel={formatOptionLabel}
          isDisabled={isLoadingContracts || finalContractList.length === 0}
          placeholder="Search for a Burn Bank"
          isClearable={true}
          noOptionsMessage={() => "No results"}
          menuPortalTarget={document.body}
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: state.isFocused ? '#ec4899' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              transition: 'all 200ms',
              cursor: 'pointer',
              padding: isSmallScreen ? '6px' : '0.5rem',
              boxShadow: state.isFocused ? '0 0 0 1px #ec4899' : 'none',
              '&:hover': {
                borderColor: '#ec4899'
              },
            }),
            input: (base) => ({ ...base, color: 'white', caretColor: 'white' }),
            menu: (base) => ({
              ...base,
              backgroundColor: 'rgb(24, 24, 27)',
              border: '1px solid rgba(63, 63, 70, 0.5)',
              borderRadius: '0.75rem',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? 'rgba(63, 63, 70, 0.4)' : 'transparent',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(63, 63, 70, 0.4)'
              }
            }),
            clearIndicator: (base) => ({ ...base, padding: isSmallScreen ? '4px' : '8px', cursor: 'pointer' }),
            dropdownIndicator: (base) => ({ ...base, padding: isSmallScreen ? '4px' : '8px', cursor: 'pointer' }),
            valueContainer: (base) => ({ ...base, padding: isSmallScreen ? '0px 2px' : '2px 8px' }),
            menuPortal: base => ({ ...base, zIndex: 9999 }),
            singleValue: (base) => ({ ...base, color: '#fff' }),
          }}
        />
      )}
    </div>
  );
};

export default Ktv2Selector; 