import fs from 'fs';

export const deleteFile = async (filename: string) => {

  try {
                      //stat verifica o nome do arquivo
    await fs.promises.stat(filename);
  } catch {
    return;
  }
                    //unlik deleta de fato o arquivo
  await fs.promises.unlink(filename);
}