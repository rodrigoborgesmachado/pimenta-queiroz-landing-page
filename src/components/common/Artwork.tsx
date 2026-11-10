import logo from '../../assets/images/Pimenta_Queiroz_Logo.svg'
export function Artwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`artwork ${compact ? 'artwork-compact' : ''}`}
      aria-hidden="true"
    >
      <span className="art-logo">
        <img src={logo} alt="" width={1312} height={1199} />
      </span>
    </div>
  )
}
