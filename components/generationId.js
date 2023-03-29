export function str_gen(num) {
    const allStr = '123456789';
    let str = '';
    for (let i = 0; i < num; i++) {
        let pos = Math.floor(Math.random() * allStr.length);
        str += allStr.substring(pos,pos+1);
    }
    return str;
}