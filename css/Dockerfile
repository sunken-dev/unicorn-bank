# build with `docker build . -t tailwind-local`
# run with `docker run -it --rm -v $(pwd):/home/node/project tailwind-local`
FROM node:19@sha256:33e99abf6cd64858bf5cc44824f1e50b7de61c9b9a3622c407951412a33fc28e

WORKDIR /home/node

RUN npm install -D tailwindcss

ENTRYPOINT ["/usr/local/bin/npx"]
CMD [\
        "tailwindcss",\
        "-i", "./project/input.css",\
        "-o","./project/unicorn.css",\
        "--watch"\
    ]
