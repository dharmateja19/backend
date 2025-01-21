import express from 'express'
const app=express()
const port=3000
// app.get("/",(req,res)=>{
//     res.send("Hello from Dharma")
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("Hello from Dharma what ice tea you prefer")
// })
// app.get("/twitter",(req,res)=>{
//     res.send("hi from twitter")
// })
app.use(express.json())
let teadata=[]
let nextid=1
//add a new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newtea={id:nextid++,name,price}
    teadata.push(newtea)
    res.status(201).send(newtea)
})
//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teadata)
})
//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teadata.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})
//update
app.put('/teas/:id',(req,res)=>{
    const tea = teadata.find(t=>t.id===parseInt(req.params.id)) 
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const{name,price}=req.body
    tea.name=name
    tea.price=price
    res.send(200).send('tea')
})
//delete
app.delete('/teas/:id',(req,res)=>{
    const index = teadata.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send('tea not found')
    }
    teadata.splice(index,1)
    res.status(204).send('deleted')
})
app.listen(port,()=>{
    console.log(`server is running at port: ${port}...`);
})