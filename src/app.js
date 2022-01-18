// 1. Import the required node modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { engine } = require('express-handlebars');

// 2. Import the required local modules
const database = require('./database');

// 3. Configure dotenv path
dotenv.config({ path: path.join(__dirname, './.env') });

// 4. Create express app and start database connection
const app = express();
database();

// 5. Configure app port and views dir
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));

// 6. Configure render engine and view engine
app.engine(
	'.hbs',
	engine({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		extname: '.hbs',
	})
);
app.set('view engine', '.hbs');

// 7. Use app middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 8. Define app routes
app.use('/', require(path.join(__dirname, './routes/index.route')));
app.use('/items', require(path.join(__dirname, './routes/item.route')));
app.use('/rentals', require(path.join(__dirname, './routes/rental.route')));
app.use('/users', require(path.join(__dirname, './routes/user.route')));

// 9. Define app public access dir
app.use(express.static(path.join(__dirname, './public')));

// 10. Initialize app
app.listen(app.get('port'), () => {
	console.log('app running at port', app.get('port'));
});
