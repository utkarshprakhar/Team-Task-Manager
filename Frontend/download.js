const fs = require('fs');
const https = require('https');
const path = require('path');

const assets = [
  {
    name: '1_color_hunt_palette.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ujQ7J6rsYfLteW8Gkn6sWfqPslkffKFDE3wERyFPr4Mbznx9w5mCk20f2nQ5arH75mWJHT76HX3Q6X6_UMb-iDooMFKYJQkUtWeZicOFg4M1CY_LBuSZmfpg0-Vl0bk7gUNE9aEDTqorEZiZ6G8HI17pQubZy-an9iIQ_iestLIbQ803XfOK71XotLoNi4buZKanp3mlsNLTQTSu9LduW2unrWCYXOzF4l_oZzBaagyN5r4F5KUtBqIHR5-xjBCHr6quL6JC6QM0Q'
  },
  {
    name: '2_project_details.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ujAGQwPkxRPYkyItZ6sODg75OtOmc9JxFNVYwRESWJeserZWPPAYzRBu1St-Oowy8RtqhA1lhzYChYviAldN2U5AYmxamMgA3D4UnmJPtyHb4IX8J91teNUhXPu9R8S28oNvdadZZLIAgevPvMZVsxGI0ACrULIhffxq5RuW4PR9W2G3vcF6j2bn4UpBlpDcdh1pI3Vz5jxgWNsIZJpS0Wtr0p2VrHgpnDcdtREsNehJnZohBKlRKNOzsM'
  },
  {
    name: '2_project_details.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzFmZjA4ZjMxYjY4MjRhNDFiMjgxMzcxYTI2M2Q5ZjQ1EgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '3_activity_timeline.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0uhQ7Y7xYDdRO5rU-SGS7sAtHwM5yt5dI-2bKweZOLOnkF6vo6igJawyDmDcP-bCVntULhETJ8rIYmozF8vuYYqK60QWuhqDT-oUch5bqWz56t9ebhadk9V6YSJ50ESBSM5UpiOF48GotQqJ5MOYZHPsS3n7Dck7Y3xU95MHeJuY0bLOUWRcmH0hVDT6nGV_czE-TWcxtDOyF4UrkIF_6xCPH_-1FcX82keeIS3wxYdeZz-iurawfqvJQjg'
  },
  {
    name: '3_activity_timeline.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y4ODk5Nzg0NDYwNTQ0YzlhNzIwMjQ3MDFkZjI4MThiEgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '4_advanced_dashboard.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ujjmRnwasGaHFmfp0J7bdKRdM7meHDSEiOkulAYDxHXz80rxWwrxlQJQKsI0nhOvJ_heyFhqt5F_GnS-mG1OMy7fOKfLieq349vZjxGSNIp3a9ZTzsDVPCh6W8tYSqelo18skK2k0-s2dLtTx363nNl7BeDMXy4qYIaqollFwlkjVzIgjroNWRr2ViDap4jfn0c0U0-eav0YNxeiHU2_PnTepDyv-jm5ITh0NdxKijX8DajDwoCVgkqYZo'
  },
  {
    name: '4_advanced_dashboard.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU5NTk5YjcyNjk3ZjQ5NjhiYmIzZWVhYmVlOTQzYjgzEgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '5_task_board.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ug2OI_PAxfPGJfPBbQNR2oTePROxdX2FobanzphxXnTr1Ln1o5EC5mLfMI017cn1GOLGzp5HUW5rxHxWZVauuy72QOthp10yKT-ZWTkGO-MDbgnvMb8lz1gzysKud_7rD9ENylzPOQ9WzWM1kT9cEDAtZWJRa4KMCrshpfgDRxhzQgvqsfJ84VtsJKJ1smaz9tXLF8txyAN34Z_toPFqwKbKGNFHYbpIh6ymtqcnDb2qH18JZNwW4lDvsw'
  },
  {
    name: '5_task_board.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhkN2NmZmQ3MDAzODRjNjU5ODFiODgyNmMyYTVlMmZhEgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '6_dashboard.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ujLQRvpOP6BwYy6eQcwZtz96MGQYVUOYHkr47UEwrySHKDlEzApYrrQoqsWFVW5uh7ZXfHfpHTbYllMW0UHEAtyRX1LzPdxioklqZeGu-iLm04Sbym6yBEyzAywuVkzJBgYgJu9noGVayKbr-LEW7GpKNhMhvYfTOPkR6Yo8dYGY-1-VAxxn4JjHMipeVxbJFCg6zSPUPWpj42rjrAbci3o7k6q8gJKAXAJ34hVKTiRFAveVZojt-V7Iw'
  },
  {
    name: '6_dashboard.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNlNGVhNGExNTU0MjQ4NDdhODQ5MTFkOGE2NDM0YTc1EgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '7_login_signup.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0ug4iI3QwFSrpmMZmat7xeK7C711cs9kGpnT-thYxEYenHGy7Mt3NmWev4MY6c4QhuroLMrhfps2gsl2iP0fDaUy2az9kvfKqW7uLVRtHSjr-glA6yhbDhgrTj9ZkPEtZ86YcbemxUuPa4oBJAiXkfJq_FrXhZ-YsjstbVIuhte6XryABwgmqg-9BCeBro63ViyIBvWsMSwD_xq9kWe7bi1Wn_E3flESC8KFtjMWQIsL_CveziSP3MO8AdA'
  },
  {
    name: '7_login_signup.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VlODAxMmI3MDA1YzRkNzA4NDQ5NmNiZjZkMjRlNGEzEgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  },
  {
    name: '8_projects.png',
    url: 'https://lh3.googleusercontent.com/aida/ADBb0uh1TvSCNFHGRn7ZpIDvaBoMJOlqXW2UxVPY6W1Fwp2-w5NhQR_EODUez7SrSRG6n2nfZXcPVeUEJYHLGCh7B_bSERSunKiow81MnMQm43ct72bVWarFqfXa_bMeQfjJprst1ga53BSeaatq_8vGhHJsx7MhKVO7PWlTrZAP_dIOKyUJ5fU5Wr5BGNfIsGGrI6xHLu0Q4mpSApkoLMHwUPiAINs2KTCyKRHgWHT0nvvn9qoiPqbrcb00lZ8'
  },
  {
    name: '8_projects.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2IxOTRmZWM2NTc2NTRmNTQ5MTg1NzRjOWRiMzhjZjY3EgsSBxCogtbR7RoYAZIBIwoKcHJvamVjdF9pZBIVQhM4Nzg1MTg4NjkwODQxOTgzMDQ5&filename=&opi=89354086'
  }
];

const downloadDir = path.join(__dirname, 'stitch_assets');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Follow redirects if necessary
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const asset of assets) {
    console.log(`Downloading ${asset.name}...`);
    try {
      await downloadFile(asset.url, path.join(downloadDir, asset.name));
      console.log(`Successfully downloaded ${asset.name}`);
    } catch (err) {
      console.error(`Failed to download ${asset.name}:`, err);
    }
  }
}

run();
