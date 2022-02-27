
FROM node:16.14-slim as base

FROM base as node-deps

COPY frontend/package.json .
RUN npm install

FROM base as runtime

ARG APP_DIR=/app
ARG FE_DIR=frontend
ARG FE_PATH=$APP_DIR/$FE_DIR

# Create user and group
ARG APP_USR=appusr
ARG APP_GRP=appgrp

RUN groupadd -r $APP_GRP
RUN useradd -r -m $APP_USR
RUN usermod -a -G $APP_GRP $APP_USR

RUN mkdir $APP_DIR

# Change ownership of /app to appusr from root
RUN chown appusr:appgrp $APP_DIR

USER $APP_USR

# Copy node dependencies from the node-deps stage
COPY --chown=appusr:appgrp --from=node-deps /node_modules $FE_PATH/node_modules

# Copy application into container
COPY --chown=appusr:appgrp ./$FE_DIR $FE_PATH

# Become appusr to run the app
WORKDIR $FE_PATH

# Run the application
CMD ["npm", "start"]

EXPOSE 3000
