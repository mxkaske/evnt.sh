'use server';
 
export async function submitEmail(data: FormData) {
  const email = data.get("email");
  console.log({email})
  if (email) {
    // TODO: replace by Highstorm!
    await wait(3000)
  }
}

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};
