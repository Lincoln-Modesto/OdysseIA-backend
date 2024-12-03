import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI ?? '';
    if (!MONGO_URI) {
      throw new Error('A variável de ambiente MONGO_URI não está definida.');
    }

    await mongoose.connect(MONGO_URI);

    console.log('MongoDB conectado!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao conectar ao MongoDB:', error.message);
    } else {
      console.error('Erro desconhecido ao conectar ao MongoDB:', error);
    }
    process.exit(1);
  }
};