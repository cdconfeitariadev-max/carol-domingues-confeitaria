// Migra as imagens hospedadas no domínio original para public/imagens/
// e reescreve as referências em src/data/catalog.ts e index.html.
// Uso: node scripts/baixar-imagens.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'imagens')
const files = ['src/data/catalog.ts', 'index.html']
const remoteRe = /https:\/\/carol-domingues-natal-2026\.nathygarcia85\.chatgpt\.site\/[^\s'"`)]+/g

const sources = new Set()
for (const rel of files) {
  const text = await readFile(path.join(root, rel), 'utf8')
  for (const match of text.matchAll(remoteRe)) sources.add(match[0])
}

if (sources.size === 0) {
  console.log('Nenhuma referência externa encontrada. Nada a fazer.')
  process.exit(0)
}

await mkdir(outDir, { recursive: true })

const localByRemote = new Map()
for (const url of sources) {
  const name = path.basename(new URL(url).pathname)
  const target = path.join(outDir, name)
  if (!existsSync(target)) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Falha ao baixar ${url}: ${res.status}`)
    await writeFile(target, Buffer.from(await res.arrayBuffer()))
    console.log(`baixado: ${name}`)
  }
  localByRemote.set(url, `/imagens/${name}`)
}

for (const rel of files) {
  const abs = path.join(root, rel)
  const text = await readFile(abs, 'utf8')
  const next = text.replace(remoteRe, (url) => localByRemote.get(url) ?? url)
  if (next !== text) {
    await writeFile(abs, next)
    console.log(`atualizado: ${rel}`)
  }
}
