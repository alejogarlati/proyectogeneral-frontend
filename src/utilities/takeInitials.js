export const takeInitials = (string) => {
  const initials = string.split(" ").map(inicial => inicial.charAt(0)).join("");
  if (initials.length > 2) {
    return initials.charAt(0) + initials.charAt(initials.length - 1);
  }  
  return initials;
}