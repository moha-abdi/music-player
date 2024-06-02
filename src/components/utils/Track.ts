export interface Track {
	url: string
	type?: any
	/** The user agent HTTP header */
	userAgent?: string
	/** Mime type of the media file */
	contentType?: string
	/** (iOS only) The pitch algorithm to apply to the sound. */
	headers?: {
		[key: string]: any
	}
	[key: string]: any
	artwork?: string
}
