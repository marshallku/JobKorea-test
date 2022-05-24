interface RadioProps {
    items: { id: string; name: string }[];
    groupName: string;
    stateSetter: (value: React.SetStateAction<string>) => void;
}
