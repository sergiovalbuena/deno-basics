// const location = Deno.args[0];
// console.log(`Welcome to ${location}`);

const resorts = {
  Alta: { elevation: 10500, snow: 100, expectedSnowFall: 10 },
  Snowbird: { elevation: 11000, snow: 200, expectedSnowFall: 20 },
  Solitude: { elevation: 8000, snow: 50, expectedSnowFall: 5 },
  Brighton: { elevation: 9500, snow: 150, expectedSnowFall: 15 },
};

import { parseArgs } from "jsr:@std/cli/parse-args";
//const args = parseArgs(Deno.args);
//console.log(args);

const args = parseArgs(Deno.args, {
  alias: {
    resort: "r",
    help: "h",
  },
  default: {
    resort: "Alta",
  },
});

const resortName = args.resort as keyof typeof resorts;
const resort = resorts[resortName];

if (!resort) {
  console.log(`Resort ${resortName} not found, try another one`);
  Deno.exit(1);
}

if (args.help) {
  console.log(`
  Usage: deno run main.ts [options]
  Options:
  -r, --resort <resortName>  Resort name
  -h, --help                 Show help
  `);
  Deno.exit(0);
}

console.log(
  `%c
  Resort: ${resortName}
  Elevation: ${resort.elevation} feets
  Snow: ${resort.snow}
  Expected Snow Fall: ${resort.expectedSnowFall}
  `,
  "color: blue"
);
