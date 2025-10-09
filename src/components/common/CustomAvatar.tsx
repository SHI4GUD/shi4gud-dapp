import { AvatarComponent } from '@rainbow-me/rainbowkit';

const CustomAvatar: AvatarComponent = ({ ensImage, size }) => {
  const color = '#000'
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      <img 
        src='/assets/logos/shi4gud-coin.svg'
        width={size}
        height={size} 
      />
    </div>
  );
};

export default CustomAvatar; 