import { v4 as uuid } from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if(!file) return callback(new Error('file empty!'), false);

    // console.log({file})

    const fileExtension = file.mimetype.split('/')[1]

    const fileName = `${uuid()}.${fileExtension}`


    callback(null, fileName);

}