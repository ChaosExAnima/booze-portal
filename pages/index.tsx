import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from 'styles/Home.module.css';

export default function Home() {
	const [ session ] = useSession();
	return (
		<div className={ styles.container }>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={ styles.main }>
				<h1 className={ styles.title }>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				{ session && <p>
					Signed in as { session.user.email } <br />
					<button onClick={ () => signOut() }>Sign Out</button>
				</p> }
				{ ! session && <button onClick={ () => signIn() }>Sign in</button> }
			</main>

			<footer className={ styles.footer }>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className={ styles.logo } />
				</a>
			</footer>
		</div>
	);
}
