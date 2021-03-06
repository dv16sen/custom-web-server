import {HttpRequest, Server} from "./Server";

const handleRequest = ({request, response, error}: HttpRequest) => {
    if(error){
        return response.send(error.message);
    } else if(request.method === "POST"){
        return response.send(`You posted:\n${request.readBody()}`);
    }

    switch(request.url){
    case "/xml":
        response.send(`
            <?xml version="1.0" encoding="UTF-8"?>
            <sample>This is a sample XML response</sample>
        `);
        break;
    case "/error":
        response.setStatus(400, "Bad Request").send();
        break;
    case "/hello":
        response.send("Hello!");
        break;
    default:
        response.send(request);
        break;
    }
};

const server = new Server({port: 3000});

server.get("/", ({response}) => response.send(`
    <html lang="en">
        <head><title>Custom Server</title></head>
        <body><h1>This is a sample HTML response</h1></body>
    </html>
`));

server
    .start(handleRequest)
    .catch(err => {
        console.error(err);
        process.exit(1);
    });