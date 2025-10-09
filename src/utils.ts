import { timingSafeEqual, createHash } from 'crypto';

export function timeSafeCompare(s1: string, s2: string): boolean{
    const s1Hash = createHash('sha256').update(s1, 'utf8').digest();
    const s2Hash = createHash('sha256').update(s2, 'utf8').digest();
    return timingSafeEqual(s1Hash, s2Hash);
}
