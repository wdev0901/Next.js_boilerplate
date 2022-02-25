import Link from "next/link";
import Image from "next/image";

const FirstPost = () => {
    return(
        <>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to Home</a>
                </Link>
            </h2>
            <Image
                src="/profile.jpg"
                height={144}
                width={144}
                alt="picture"
            />
        </>
    );
};

export default FirstPost;