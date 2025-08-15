export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isUrl = (v: string) => /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}.*$/i.test(v);
