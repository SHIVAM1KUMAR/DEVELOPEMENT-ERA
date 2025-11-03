const http=require('http');

const server=http.createServer(function(req,res){
  res.end("HEllo World");
})
server.listen(5000);