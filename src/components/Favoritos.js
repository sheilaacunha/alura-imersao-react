import styled from "styled-components"
import config from "../../config.json"

const StyledFavoritos = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
   color: ${({ theme }) => theme.textColorBase || "#222222"};
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
  }

  div {
    display: flex;
	padding: 16px;
	gap: 16px;
  }

  div a {
	display: flex;
	align-items: center;
	flex-direction: column;
	text-decoration: none;
  }

  div a span {
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
	padding-top: 10px;
   color: ${({ theme }) => theme.textColorBase || "#222222"};
  }
`;

export default function Favoritos() {
	return (
		<StyledFavoritos>
			<section>
				<h2>AluraTube Favoritos</h2>
				<div>
					{config.favoritos.map((favorito, index) => {
						return <Favorito key={index} favorito={favorito} />
					})}
				</div>

			</section>
		</StyledFavoritos>
	);
}

function Favorito(props) {
	return (
		<div>
			<a className={'favorito-item'} href={`https://youtube.com/${props.favorito.tag}`}>
				<img src={props.favorito.thumbnail} alt=""/>
				<span>@{props.favorito.tag}</span>
			</a>
		</div>
	)
}
