export const NumberInput = ({onChange, value}) => {
    return(
        <input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        type="tel"
        name="number"
        pattern="\+?[0-9\s\-\(\)]+"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    )
}