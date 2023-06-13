export const NameInput = ({onChange, value}) => {
    return(
        <input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        type="text"
        name="name"
        pattern="^[А-Яа-яЁёa-zA-Z\s]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    )
}