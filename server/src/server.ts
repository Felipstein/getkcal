import { app } from './app';
import { env } from './env';

const port = env().PORT;

app.listen(port, () => console.info(`Server is running at port ${port}`));
