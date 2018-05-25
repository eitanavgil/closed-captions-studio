// export const toSeconds = (val: any) => {
//     const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
//     const parts = regex.exec(val);
//
//     if (parts === null) {
//         return 0;
//     }
//
//     for (let i = 1; i < 5; i++) {
//         parts[i] = parseInt(parts[i], 10);
//         if (isNaN(parts[i])) parts[i] = 0;
//     }
//
//     // hours + minutes + seconds + ms
//     return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
// };
//  // default toSeconds;