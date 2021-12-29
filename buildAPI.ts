import * as awsx from "@pulumi/awsx";

export const buildAPI = () => {
  // Deploy the EC2 instance
  // Create a load balancer on port 80 and spin up two instances of Nginx.
  const loadBalancer = new awsx.lb.ApplicationListener("api", { port: 80 });
  const api = new awsx.ecs.FargateService("api", {
    taskDefinitionArgs: {
      containers: {
        api: {
          image: awsx.ecs.Image.fromDockerBuild("api", {
            dockerfile: "api/Dockerfile",
            context: "api",
          }),
          memory: 128,
          portMappings: [loadBalancer],
        },
      },
    },
    desiredCount: 2,
  });

  return loadBalancer;
};
