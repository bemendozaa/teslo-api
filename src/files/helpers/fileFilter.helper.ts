export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {


    if(!file) return callback(new Error('file empty!'), false);

    // console.log({file})

    const fileExtension = file.mimetype.split('/')[1]

    const validExtensions = ['jpg', 'png', 'gif'];

    if(validExtensions.includes(fileExtension))
    {
        return callback(null, true)
    }

    callback(null, true);

}