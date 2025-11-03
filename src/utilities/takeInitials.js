export const takeInitials = (string) => {
    const initials = string.split(" ")
        const name = initials[0]
        let lastName = ""
        
        if (initials.length > 2) {
          lastName = initials[2]
        } else {
          lastName = initials[1]
        }
    
        const finalInitials = name.charAt(0) + lastName.charAt(0)
        return finalInitials
}