import ContentLoader from 'react-content-loader';
const CardLoader = (props) => (
  <li className="card">
    <ContentLoader speed={2} viewBox="0 0 210 260" backgroundColor="#F2F2F2" foregroundColor="#d1d1d1" {...props}>
      <rect x="30" y="143" rx="4" ry="4" width="150" height="15" />
      <rect x="30" y="36" rx="10" ry="10" width="150" height="91" />
      <rect x="30" y="162" rx="4" ry="4" width="93" height="15" />
      <rect x="30" y="199" rx="4" ry="4" width="80" height="24" />
      <rect x="148" y="191" rx="5" ry="5" width="32" height="32" />
    </ContentLoader>
  </li>
);

export default CardLoader;
