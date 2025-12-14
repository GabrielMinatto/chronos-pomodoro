import styles from './styles.module.css'

type GenereicHtmlProps = {
    children: React.ReactNode;
}

export function GenericHtml({ children }: GenereicHtmlProps) {
    return (
        <div className={styles.genericHtml}>{children}</div>
    )
}