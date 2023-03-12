export const safeLog = (args: any) => {
  if (import.meta.env.VITE_NODE_ENV === "dev") {
    console.log(args);
    return;
  }
  console.log("Error occurs !");
};
