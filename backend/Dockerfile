
FROM python:3.8.12-slim as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

# Create a venv having all the python dependencies.
FROM base AS python-deps

# Install pipenv and compilation dependencies
RUN pip install pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc

# Install python dependencies in /.venv
COPY backend/Pipfile .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy


FROM base AS runtime

ARG APP_DIR=/app
ARG BE_DIR=backend
ARG BE_PATH=$APP_DIR/$BE_DIR

# Create user and group
ARG APP_USR=appusr
ARG APP_GRP=appgrp

RUN groupadd -r $APP_GRP
RUN useradd -r -m $APP_USR
RUN usermod -a -G $APP_GRP $APP_USR

# Copy virtual env from python-deps stage
COPY --chown=appusr:appgrp --from=python-deps /.venv $BE_PATH/.venv

# Set path for python to be from the venv
ENV PATH="$BE_PATH/.venv/bin:$PATH"

# Install application into container
COPY --chown=appusr:appgrp ./$BE_DIR $BE_PATH
COPY --chown=appusr:appgrp content-dist $APP_DIR/content-dist

# Become appusr to run the app
WORKDIR $BE_PATH
USER $APP_USR

# Run the application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]

# Allow access to default flask port
EXPOSE 5000
