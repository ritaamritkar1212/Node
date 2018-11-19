const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('streamIt',(text)=>{
	return text.toUpperCase();
});


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url} `;
	fs.appendFile('server.log', log+'\n', (err)=>{
		if(err){
			console.log('Unable to append to Sever.log');
		}
	})
	console.log(log);
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintainance.hbs',{
// 		maintainanceMessage: 'We will be back soon'
// 	});
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
// res.send('hello Express');
// res.send({
// 	name: "rita",
// 	qualification: "engg"
// })
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome to my website'
	});
});


app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage: "Bad Request"
	})
})

app.listen(3000,()=>{
	console.log('Server is up on port 3000');
});