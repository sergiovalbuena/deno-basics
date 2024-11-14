import { TextLineStream } from "@std/streams";
import { toTransformStream } from "@std/streams/to-transform-stream";

const response = await fetch("https://jsonplaceholder.typicode.com/users");
const data = await response.json();

//console.log(data);

//textLine Stream
const txtResponse = await fetch("https://example.com/data.txt");
if (txtResponse.body) {
  const transformdStream = txtResponse.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream())
    .pipeThrough(
      toTransformStream(async function* (src) {
        for await (const chunk of src) {
          // console.log(chunk);
          yield chunk;
        }
      })
    );
  const reader = transformdStream.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log(value);
  }
}
