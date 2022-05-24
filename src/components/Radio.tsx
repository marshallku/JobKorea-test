import "./Radio.css";

export default function Radio({ items, groupName, stateSetter }: RadioProps) {
    return (
        <div>
            {items.map(({ id, name }) => (
                <span key={id} className="radio">
                    <input
                        type="radio"
                        name={groupName}
                        id={`${groupName}-${id}`}
                        className="radio__input"
                        onChange={() => {
                            stateSetter(name);
                        }}
                    />
                    <div className="radio__icon">
                        <div className="radio__circle" />
                    </div>
                    <label htmlFor={`${groupName}-${id}`}>{name}</label>
                </span>
            ))}
        </div>
    );
}
