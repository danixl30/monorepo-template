# syntax=docker/dockerfile:1.7-labs
FROM node:22-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN ls
RUN pnpm install
RUN pnpm run build

FROM node:20-alpine as prod
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY --from=base /app/@app/api/dist /app/@app/api/dist
COPY --parents --from=base /app/*/*/esm .
COPY --from=base /app/package.json /app/package.json
COPY --parents --from=base /app/*/*/package.json .
COPY --from=base /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=base /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
WORKDIR /app
RUN pnpm install -P --ignore-scripts
RUN ls
CMD ["pnpm", "start:prod"]
