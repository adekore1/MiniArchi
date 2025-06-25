
// //route.ts Route Handlers
// //POST localhost:3000/api/chat
// // src/app/api/chat/route.ts
// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// export const runtime = "edge";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Handle POST requests
// export async function POST(req: Request){
//   // try{

//     // Parse the request body
//     // const body = await req.json();

//     // console.log("Received request:", JSON.stringify(body, null, 2));

//     // const messages = body.messages || [];
//     // if (!messages.length) {
//     //   return new Response(JSON.stringify({ message: "No messages received" }), {
//     //     status: 400,
//     //     headers: { "Content-Type": "application/json" },
//     //   });
//     // }

//     const { messages } = await req.json();

//     // Call OpenAI API
//     const nodeStream = await openai.chat.completions.create({
//       model: "gpt-4o",  // Use a valid model name
//       stream: true,
//       messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           ...messages,
//       ],
//     });

//     // const aiResponse = completion.choices[0].message.content;
//     // //Log API Response
//     // console.log("AI Response from API:", aiResponse);

//     // console.log("Final API Response:", JSON.stringify({ content: aiResponse }, null, 2));


//     // Return the AI's response
//     // return new Response(
//     //   JSON.stringify({
//     //     role: "assistant",
//     //     content: aiResponse,
//     //   }),
//     //   {
//     //     status: 200,
//     //     headers: { "Content-Type": "application/json" },
//     //   }
//     // );

//     // 2. Wrap it in a WHATWG ReadableStream that emits SSE ("data: …\n\n")
//       const encoder = new TextEncoder();
//       const webStream = new ReadableStream<Uint8Array>({
//         async start(controller) {
//           try {
//             for await (const chunk of nodeStream) {

//               const delta = chunk.choices[0].delta;
//           // Some chunks only signal "role": "assistant" at the start
//           // and others contain `content`. We only emit frames when there's something to show:
//               if (delta.role || delta.content) {
//                 const message = {
//                   role: delta.role ?? "assistant",
//                   content: delta.content ?? ""
//                 };
//               // chunk is a ChatCompletionChunk object
//               // Turn it into a JSON string and frame it as SSE
//               const payload = JSON.stringify(chunk);
//               controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
//             }
//           }
//           } catch (e: unknown) {
//             // Narrow e → get a message string
//             const message =
//               e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";
//             controller.enqueue(
//               encoder.encode(`event: error\ndata: ${JSON.stringify({ message })}\n\n`)
//             );
//           } finally {
//             controller.close();
//           }
//         },
//       });



//     return new NextResponse(webStream, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache, no-transform",
//         Connection: "keep-alive",
//       },
//     });


//   //   }catch(error){
//   //   // Log the full error for debugging

//   //   console.error("OpenAI API Error:", error);
//   //   if (error instanceof Error) {
//   //     return new Response(JSON.stringify({ message: "Error with OpenAI API", error:error.message}), {
//   //       status: 500,
//   //       headers: { "Content-Type" : "application/json"},
//   //     });

//   //   } else {
//   //     return new Response(JSON.stringify({ message: "An unknown error occured"}), {
//   //       status: 500,
//   //       headers: {"Content-Type": "application/json"},
//   //     });
//   //   }
//   // }
// }



// import OpenAI from "openai";

// // Switch to Edge so we get WHATWG streams
// export const runtime = "edge";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(request: Request) {
//   const { messages } = await request.json();

//   // 1) Grab the Node-style stream of ChatCompletionChunk objects
//   const nodeStream = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     stream: true,
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       ...messages,
//     ],
//   });

//   // 2) Wrap it in a WHATWG ReadableStream that emits each chunk verbatim
//   const encoder = new TextEncoder();
//   const webStream = new ReadableStream<Uint8Array>({
//     async start(controller) {
//       try {
//         for await (const chunk of nodeStream) {
//           // Emit the full chunk object—useChat needs this exact shape
//           controller.enqueue(
//             encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
//           );
//         }
//       } catch (e: unknown) {
//         const msg =
//           e instanceof Error
//             ? e.message
//             : typeof e === "string"
//             ? e
//             : "Unknown error";
//         controller.enqueue(
//           encoder.encode(
//             `event: error\ndata: ${JSON.stringify({ message: msg })}\n\n`
//           )
//         );
//       } finally {
//         controller.close();
//       }
//     },
//   });

//   // 3) Return it as an SSE endpoint
//   return new Response(webStream, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache, no-transform",
//       Connection: "keep-alive",
//     },
//   });
// }


import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const personality: {role: "system"; content: string}={
    role: "system",
    content: `You are a professional architect, the best in the world
              -you possess vasts knowledge on architecture, ranging from calculations to designs and everything in between.
              -you speak like a professor, very eloquent and precise, when explanations are required you go in depth.
              -Always encouraging creativity, innovation and flexibility, but very realistic.
              -Your designs break the norm and open a new door for architectural adventures, and are accomodating for teh abilities of engineers as well.
              -You can design and renovate anything from a tiny shed to an unfathomable structure.
              -You give resources for learning, as well as descriptions of designs that make recreation super easy and efficient.
              -You also possess vast and accurate general knowledge for general questions.
              -You appealto africans and speak in a way easy for them to understand, accomodating all sorts of languages.
              `.trim(),
  };

  const allMessages = [personality, ...messages];

  // streamText gives you a DataStreamWriter under the hood
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: allMessages,
  });

  // this emits the proper x-vercel-ai-data-stream: v1 header
  return result.toDataStreamResponse({
    sendUsage: false,  // optional
  });
}