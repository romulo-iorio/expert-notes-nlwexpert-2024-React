interface Props {
  children: React.ReactNode;
}

export const NotesContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
      {children}
    </div>
  );
};
