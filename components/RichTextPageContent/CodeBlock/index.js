import CodeBlockStyle from "./CodeBlock.module.css";
import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.min.css";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default function CodeBlock(props) {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight();
  }, []);

  const { language, code } = props;

  return (
    <pre className={`${CodeBlockStyle.codeBlock} shadow-lg line-numbers language-${language}`}>
      <code className={CodeBlockStyle.codeBlock__inner}>{code}</code>
    </pre>
  );
}
