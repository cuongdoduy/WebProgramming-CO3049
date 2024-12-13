import * as AWS from 'aws-sdk'

type S3UploadResponse = {
  Location: string
  key: string
  Bucket: string
}

class S3Uploader {
  private s3: AWS.S3
  private bucket: string

  constructor(region: string, bucket: string) {
    if (!region || !bucket) {
      throw new Error('AWS region and bucket name must be provided.')
    }

    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: region,
      params: { Bucket: bucket },
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
      },
    })

    this.bucket = bucket
  }

  /**
   * Upload a file to S3
   * @param {File} file - The file object to upload
   * @param {string} folder - The folder where the file will be uploaded
   * @returns {Promise<S3UploadResponse>}
   */
  async upload(file: File, folder: string): Promise<S3UploadResponse> {
    if (!file || !folder) {
      throw new Error('File and folder must be provided for upload.')
    }

    const timestamp = Date.now().toString()
    const sanitizedFileName = this.sanitizeFileName(file.name)
    const fileKey = `${folder}/${timestamp}-${sanitizedFileName}`

    try {
      const fileBuffer = await this.getFileBuffer(file)
      return await this.uploadToS3(fileBuffer, fileKey, file.type)
    } catch (error) {
      console.error('Error during file upload:', error)
      throw new Error('Failed to upload file to S3.')
    }
  }

  /**
   * Convert File to Buffer
   * @param {File} file - The file object
   * @returns {Promise<Buffer>} - The file content as buffer
   */
  private async getFileBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(Buffer.from(reader.result))
        } else {
          reject(new Error('File could not be read as ArrayBuffer.'))
        }
      }
      reader.onerror = error => reject(error)
      reader.readAsArrayBuffer(file)
    })
  }

  /**
   * Sanitize the file name by removing non-alphanumeric characters, replacing spaces with dashes, and trimming excess dashes.
   * @param {string} fileName - Original file name
   * @returns {string} - Sanitized file name
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .split('.')[0]
      .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with '-'
      .replace(/-{2,}/g, '-') // Replace consecutive '-' with a single '-'
      .replace(/^-+|-+$/g, '') // Trim leading and trailing '-'
  }

  /**
   * Upload a file to S3 bucket
   * @param {Buffer} fileBuffer - The file content as buffer
   * @param {string} key - The S3 object key
   * @param {string} mimeType - The MIME type of the file
   * @returns {Promise<S3UploadResponse>} - The response from S3
   */
  private async uploadToS3(
    fileBuffer: Buffer,
    key: string,
    mimeType: string
  ): Promise<any> {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentType: mimeType,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.s3.config.region,
      },
    }

    const options = {
      partSize: 100 * 1024 * 1024, // 100 MB
      queueSize: 10, // 10 concurrent uploads
    }

    try {
      const s3Response = await this.s3.upload(params, options).promise()
      return s3Response
    } catch (error) {
      console.error('Error in S3 upload:', error)
      throw error
    }
  }
}

// Usage example:
// const uploader = new S3Uploader(process.env.AWS_REGION!, process.env.AWS_BUCKET!);
// const response = await uploader.upload(file, 'folder-name');
// console.log(response);

export default S3Uploader
