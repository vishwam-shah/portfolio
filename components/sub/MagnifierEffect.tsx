// components/MagnifierEffectText.js

const MagnifierEffectText = () => {
    return (
      <div className="relative inline-block">
        <p className="transition-transform duration-300 group-hover:scale-110 group-hover:text-gray-800 text-xl group cursor-pointer">
          Hover over this text to see the magnifier effect.
        </p>
      </div>
    );
  };
  
  export default MagnifierEffectText;
  