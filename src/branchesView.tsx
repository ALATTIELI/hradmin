import branches from './branchesData';
import { Link } from 'react-router-dom';

function BranchesView() {
    return (
        <div>
            <h1>Branches</h1>
            {branches.map(branch => (
                <div key={branch.id}>
                    <span>{branch.name}</span>
                    <Link to={`/warranty-view?branch=${branch.id}`}>View Forms</Link>
                </div>
            ))}
        </div>
    );
}

export default BranchesView;
