// for await (const entry of Deno.readDir(".")) {
//   console.log(entry);
// }
//deno run --allow-read main.ts
// or deno run -R main.ts

async function tree(dir: string): Promise<string[]> {
  const out = [];
  for await (const entry of Deno.readDir(dir)) {
    out.push(entry.name);
  }
  return out;
}

const files = await tree(Deno.args[0]);
console.log(files);
console.log("%c" + files.join("/n"), "color: red; font-size: 20px;");
// deno -R main.ts <.>

/*
deno FormData
deno check 
deno lint 
deno run --watch
deno test 
deno bench 
*/
