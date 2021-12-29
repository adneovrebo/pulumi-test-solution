import { Output } from "@pulumi/pulumi";

// Awaiting for value to be generated to be used in other resources.
export const GetValue = <T>(output: Output<T>) => {
  return new Promise<T>((resolve, reject) => {
    output.apply((value) => {
      resolve(value);
    });
  });
};
