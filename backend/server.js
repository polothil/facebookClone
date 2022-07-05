const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { readdirSync } = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
const options = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(options));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// const userRoute = require('./routes/user');
// app.use('/', userRoute);

// (video 12) alternative to above two lines and dynamically adds other routes as well
readdirSync('./routes').map((route) => app.use('/', require('./routes/' + route)));

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb: ', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});
