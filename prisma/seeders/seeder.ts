import { productSeeder } from "./productSeeder";

const userId = "1d48917d-4e55-4ee0-aad2-7812d127ce2d";
const main = async () => {
  await productSeeder(userId);
};

main();
