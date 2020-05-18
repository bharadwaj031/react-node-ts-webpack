function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    // The script has HTTP headers preventing caching, so cache-bust is normally not necessary.
    // But include it anyway in case there are corner cases we didn't consider.
    script.src = url + '?cache-bust=' + Date.now()
    script.onload = () => resolve()
    script.onerror = (ev: ErrorEvent) => reject(new Error(`Error loading script: ${ev.message} ${ev.filename}:${ev.lineno}.${ev.colno}`))
    const head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
  })
}
const getAppData = () => {
    return Promise.resolve({name: 'Bharadwaj'})
}
async function main(): Promise<void> {
  try {
      // eslint-disable-next-line no-console
      console.log('authenticated')
      const [data] = await Promise.all([
        getAppData().then((x: any) => { return x }),
        loadScript('/js/app.js').then((x: any) => { return x })
      ])
      console.log('Starting application')
      window.onDataReceived(data)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('error', err)
    // eslint-disable-next-line ban/ban
    alert(err.name + ': ' + err.message)
  }
}

main()
