import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const worksDir = path.join(__dirname, '..', 'public', 'images', 'works')

const targets = [
  '21_entropie.jpeg',
  '22_conforto_desconforto.jpeg',
  '23_pulsao_morte.jpeg',
]

for (const filename of targets) {
  const input = path.join(worksDir, filename)
  const outputName = filename.replace(/\.jpe?g$/i, '.webp')
  const output = path.join(worksDir, outputName)

  const before = (await stat(input)).size
  await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output)
  const after = (await stat(output)).size

  const saved = (((before - after) / before) * 100).toFixed(1)
  console.log(`✅ ${filename} → ${outputName}  |  ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB  (${saved}% menor)`)
}

console.log('\n🎉 Conversão concluída! Atualize os caminhos nos arquivos JSON.')
