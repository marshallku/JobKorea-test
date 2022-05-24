export default function Radio({ items, groupName, stateSetter }: RadioProps) {
    return (
        <div>
            {items.map(({ id, name }) => (
                <span key={id}>
                    <input
                        type="radio"
                        name={groupName}
                        id={`${groupName}-${id}`}
                        onChange={() => {
                            stateSetter(name);
                        }}
                    />
                    <label htmlFor={`${groupName}-${id}`}>{name}</label>
                </span>
            ))}
        </div>
    );
}
