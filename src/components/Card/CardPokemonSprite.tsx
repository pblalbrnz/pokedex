interface CardPokemonSpriteProps {
  sprite: string;
  name: string;
  id: number;
}

export function CardPokemonSprite(props: CardPokemonSpriteProps) {
  return (
    <div className="w-full h-32 flex flex-col items-center px-4 py-2">
      <span className="self-start text-slate-100 font-bold font-noto">
        #{props.id}
      </span>
      <div className="w-[88px] aspect-square p-1 rounded-full bg-neutral-200 bg-opacity-25 border-2 border-neutral-300 border-opacity-25">
        <img
          src={props.sprite}
          alt={props.name}
          className="absolute -mt-5 -ml-6 w-32"
        />
      </div>
    </div>
  );
}
